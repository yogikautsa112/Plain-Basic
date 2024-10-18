import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const formMapper = {
  input: FormInput,
  textarea: FormInput,
  select: FormSelect,
  password: FormInput,
};

export default function Forms({ forms }) {
  return (
    <div className={`forms space-y-2`}>
      {forms.map((form) => {
        const FormComponent = formMapper[form.type];
        return <FormComponent key={form.name} {...form} />;
      })}
    </div>
  );
}
