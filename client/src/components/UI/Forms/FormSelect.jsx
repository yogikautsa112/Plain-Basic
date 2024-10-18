import FormWrapper from "./FormWrapper";

export default function FormSelect({
  placeholder,
  type,
  error,
  value,
  onChange,
  onBlur,
  options,
  label,
  name,
  id,
  size,
}) {
  return (
    <FormWrapper
      {...{
        label,
        error,
        id,
      }}
    >
      <select
        {...{
          className: [
            "select select-bordered w-full",
            error && "select-error",

            size === "small" && "select-sm",
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
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormWrapper>
  );
}
