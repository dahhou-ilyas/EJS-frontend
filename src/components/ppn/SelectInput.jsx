import Select from "react-select";

export default function SelectInput(props){
  console.log(props.hide);
  // columnSize,label,defaultOption,motif,id,...functions
  return (
    <>
      <div className={`col-${props.columnSize[0]} col-md-${props.columnSize[1]} col-xl-${props.columnSize[2]} ${props.hide?'hideInput':''}`} id={props.idDiv}>
        <div className="form-group local-forms">
          <label>
            {props.label=="ant-f"? <b>Antécédents Familiaux</b>:(props.label=="ant-p"?<b>Antécédents Personnels</b>:props.label)}
            <span className="login-danger">*</span>
          </label>
          <Select
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 })
            }}
            defaultValue={props.default}
            onChange={(selectedOption) => props.functions.forEach((func) => func(selectedOption))}
            options={props.options}
            id={props.idSelect}
            components={{
              IndicatorSeparator: () => null
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused
                  ? "none"
                  : "2px solid rgba(46, 55, 164, 0.1);",
                boxShadow: state.isFocused
                  ? "0 0 0 1px #2e37a4"
                  : "none",
                "&:hover": {
                  borderColor: state.isFocused
                    ? "none"
                    : "2px solid rgba(46, 55, 164, 0.1)"
                },
                borderRadius: "10px",
                fontSize: "14px",
                minHeight: "45px"
              }),
              dropdownIndicator: (base, state) => ({
                ...base,
                transform: state.selectProps.menuIsOpen
                  ? "rotate(-180deg)"
                  : "rotate(0)",
                transition: "250ms",
                width: "35px",
                height: "35px"
              })
            }}
          />
        </div>
      </div>
    </>
  )
}