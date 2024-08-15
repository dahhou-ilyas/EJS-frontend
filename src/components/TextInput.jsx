export default function TextInput(props){
  return (  
  <div
    className={`col-${props.columnSize[0]} col-md-${props.columnSize[1]} col-xl-${props.columnSize[2]} ${props.hide?'hideInput':''}`} 
    id={props.idDiv}
  >
    <div className="form-group local-forms ">
      <label>
        {props.label}{" "}
        <span className="login-danger">*</span>
      </label>
      <input
        className="form-control"
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.default}
      />
    </div>
  </div>
  );
}