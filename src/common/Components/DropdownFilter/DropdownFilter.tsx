import { Checkbox, Empty, Input, InputRef, Select, SelectProps } from "antd";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
// import "./styles.css";
import { isEqual } from "lodash";

export type FilterOption = {
  label: string;
  value: string;
  hidden?: boolean;
};

export interface DropdownFilterProps {
  options: FilterOption[];
  value?: FilterOption[];
  onChange?: (values: string[], options: FilterOption[]) => void;
  placement?: SelectProps['placement'];
  placeholder?: string;
  pluralLabelSuffix?: string;
  loading?: boolean;
  heightAdjust?: number;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options = [],
  value: propValue,
  onChange,
  placement = "bottomLeft",
  placeholder = "No seleccionado",
  pluralLabelSuffix = "filtros",
  loading,
  heightAdjust = 10,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<FilterOption[]>(propValue || []);
  const searchInputRef = useRef<InputRef>(null);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEqual(value, propValue)) {
      setValue(propValue || []);
    }
  }, [propValue]);

  useEffect(() => {
    if (!open) {
      searchInputRef.current?.blur();
      setSearchValue("");
    }
  }, [open]);

  const filters = useMemo(() => {
    return options.filter((option: { value: string; label: string; }) => {
      const searchRegex = new RegExp(searchValue.trim(), "gi");
      return !searchValue ||
        searchRegex.test(option.value) ||
        searchRegex.test(option.label);
    });
  }, [options, searchValue]);

  const handleOptionSelect = (filter: FilterOption) => {
    const newValue = value.some(v => isEqual(v, filter))
      ? value.filter(v => !isEqual(v, filter))
      : [...value, filter];

    setValue(newValue);
    onChange?.(newValue.map(v => v.value), newValue);
  };

  const dropdownContent = (
    <div className="p-3">
      <div className="flex flex-col gap-2 ">
        <Input
          ref={searchInputRef}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="Buscar"
          type="search"
          size="middle"
          suffix={<SearchOutlined />}
        />

        <div style={{ maxHeight: `calc(100vh - ${heightAdjust}rem)` }}
          className="flex flex-col gap-2 overflow-y-auto">
          {filters.length > 0 ? (
            filters.map(filter => (
              <Checkbox
                key={filter.value}
                checked={value.some(v => isEqual(v, filter))}
                onChange={() => handleOptionSelect(filter)}
              >
                {filter.label}
              </Checkbox>
            ))
          ) : (
            <Empty description="No hay coincidencias" />
          )}
        </div>
      </div>
    </div>
  );

  const displayValue = !value.length
    ? []
    : value.length === 1
      ? [{ value: value[0].value, label: value[0].label }]
      : [{ value: 'multiple', label: `${value.length} ${pluralLabelSuffix}` }];

  return (
    <div ref={containerRef}>
      <Select
        open={open}
        value={displayValue}
        placeholder={placeholder}
        onDropdownVisibleChange={setOpen}
        dropdownRender={() => dropdownContent}
        // mode="multiple"
        placement={placement}
        style={{ minWidth: 200 }}
        popupMatchSelectWidth={false}
        getPopupContainer={() => containerRef.current || document.body}
        labelInValue
        loading={loading}
      />
    </div>
  );
};
