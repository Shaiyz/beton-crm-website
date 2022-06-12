import {
  TextField,
  withStyles,
  makeStyles,
  CircularProgress,
  MenuItem,
} from '@material-ui/core'
// import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

const useStyle = makeStyles((theme) => ({
  countryField: {
    height: 55,
    width: '100%',
    border: '1px solid black',
    borderRadius: '1px',
    padding: '0 14px',
    font: 'inherit',
    margin: '10px 0',
    textTransform: 'uppercase',

    '&:focus': {
      borderColor: theme.palette.primary.main,
    },

    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  },
}))

const CssTextField = withStyles((theme) => ({
  root: {
    '& .MuiFormLabel-root': {
      color: 'black',
      textTransform: 'uppercase',
      fontSize: '14px',

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },

    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        borderRadius: '1px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    margin: '10px 0',
  },
}))(TextField)

const Formfeild = (props) => {
  const classes = useStyle()
  var field = null
  switch (props.elementType) {
    default:
      field = (
        <CssTextField
          variant='filled'
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          required={props.required}
          disabled={props.disabled}
          error={props.invalid}
          helperText={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        />
      )
      break
    case 'input':
      if (props.elementConfig.type === 'file') {
        field = (
          <div>
            {props.isFileUploading ? (
              <CircularProgress size={30} />
            ) : (
              <small style={{ wordBreak: 'break-word' }}>{props.value}</small>
            )}
            <CssTextField
              InputLabelProps={{ shrink: true }}
              style={{ textAlign: 'left' }}
              variant='filled'
              fullWidth
              inputProps={{ ...props.elementConfig }}
              label={props.label}
              required={props.required}
              disabled={props.disabled}
              error={props.invalid}
              helperText={props.invalid ? props.invalidMessage : ''}
              onChange={props.valueChanged}
            />
          </div>
        )
      } else {
        field = (
          <CssTextField
            variant='filled'
            fullWidth
            inputProps={{ ...props.elementConfig }}
            value={props.value}
            label={props.label}
            required={props.required}
            disabled={props.disabled}
            error={props.invalid}
            helperText={props.invalid ? props.invalidMessage : ''}
            onChange={props.valueChanged}
          />
        )
      }
      break
    case 'textarea':
      field = (
        <CssTextField
          variant='outlined'
          multiline
          row={4}
          rowsMax={Infinity}
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          required={props.required}
          disabled={props.disabled}
          error={props.invalid}
          helperText={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        />
      )
      break
    case 'select':
      field = (
        <CssTextField
          select
          variant='outlined'
          fullWidth
          inputProps={{ ...props.elementConfig }}
          value={props.value}
          label={props.label}
          required={props.required}
          disabled={props.disabled}
          error={props.invalid}
          helpertext={props.invalid ? props.invalidMessage : ''}
          onChange={props.valueChanged}
        >
          {Object.keys(props.options).map((key) => (
            <MenuItem key={key} value={props.options[key]}>
              {key}
            </MenuItem>
          ))}
        </CssTextField>
      )
      break
    // case 'country':
    //   field = (
    //     <CountryDropdown
    //       classes={classes.countryField}
    //       value={props.value}
    //       onChange={(value) => props.valueChanged({ target: { value } })}
    //     />
    //   )
    //   break
    // case 'region':
    //   field = (
    //     <RegionDropdown
    //       classes={classes.countryField}
    //       disableWhenEmpty={true}
    //       country={props.countryValue}
    //       value={props.value}
    //       onChange={(value) => props.valueChanged({ target: { value } })}
    //     />
    //   )
  }

  return field
}

export default Formfeild
