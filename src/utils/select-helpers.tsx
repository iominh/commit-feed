import { TextField, CircularProgress } from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

export const renderOption = (
  props: any,
  option: string,
  { inputValue }: any
) => {
  // Highlight matches
  const matches = match(option, inputValue);
  const parts = parse(option, matches);
  return (
    <li {...props}>
      <div>
        {parts.map((part, index) => (
          <span
            key={index}
            style={{
              fontWeight: part.highlight ? 700 : 400,
            }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </li>
  );
};

export const renderInput =
  (isLoading: boolean, label: string) => (params: any) =>
    (
      <TextField
        {...params}
        label={label}
        autoFocus
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {isLoading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    );
