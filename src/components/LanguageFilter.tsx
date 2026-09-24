interface LanguageFilterProps {
  languages: string[];
  value: string;
  onChange: (value: string) => void;
}

function LanguageFilter({ languages, value, onChange }: LanguageFilterProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="bg-bg border border-white/10 text-fg px-3 py-1.5 outline-none focus:border-accent transition-colors"
    >
      <option value="all">all languages</option>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}

export default LanguageFilter;