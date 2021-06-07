import { TextField, FormHelperText, FormControl } from "@material-ui/core";
import { useTextFieldStyle } from "./TextField.style";

const FormikTextField = (Props: any) => {
  const classes = useTextFieldStyle();
  const {
    setFieldValue,
    setFieldTouched,
    name,
    value,
    error,
    className,
    container,
    FormControlStyle,
    type,
    isWithTwoLines,
    ...props
  } = Props;

  const handleChange = (e: any): void => {
    setFieldValue(name, e.target.value);
    setFieldTouched(name, true, false);
  };

  return (
    <FormControl error={!!error} className={FormControlStyle}>
      <TextField
        className={className}
        id="outlined-basic"
        variant="outlined"
        value={value}
        onChange={handleChange}
        type={"text"}
        {...props}
      />
      {error && (
        <FormHelperText className={classes.FormHelperText} error={true}>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormikTextField;
