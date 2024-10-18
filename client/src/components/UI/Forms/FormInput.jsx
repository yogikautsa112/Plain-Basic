import FormWrapper from "./FormWrapper";

export default function FormInput({
  placeholder,
  type,
  error,
  value,
  onChange,
  onBlur,
  label,
  name,
  id,
  size,
}) {
  return (
    <FormWrapper {...{ label, id, error }}>
      {type === "textarea" ? (
        <textarea
          {...{
            className: [
              "textarea textarea-bordered w-full",
              error && "input-error",
              size === "small" && "textarea-sm",
            ]
              .filter((item) => item)
              .join(" "),
            placeholder,
            value,
            onChange,
            onBlur,
            name,
            id,
          }}
        ></textarea>
      ) : (
        <input
          {...{
            className: [
              "input input-bordered w-full",
              error && "input-error",
              size === "small" && "input-sm",
            ]
              .filter((item) => item)
              .join(" "),
            placeholder,
            type,
            value,
            onChange,
            onBlur,
            name,
            id,
          }}
        />
      )}
    </FormWrapper>
  );
}
