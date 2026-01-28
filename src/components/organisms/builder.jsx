import React from "react";

const Form = ({ children, className, methods, onSubmit }) => {
  return (
    <form className={className} onSubmit={methods?.handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                control: methods?.control,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};

export const FormBuilder = ({
  className,
  fields = [],
  methods,
  onSubmit,
  ...restProps
}) => {
  return (
    <Form
      className={className}
      methods={methods}
      onSubmit={onSubmit}
      {...restProps}>
      {fields.map((item, index) => (
        <div key={`form-input-${index}`}>{item.component}</div>
      ))}
    </Form>
  );
};
