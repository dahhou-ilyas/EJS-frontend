export default function TextAreaInput(props){
  return (
    <>
      <div
        className= {`col-${props.columnSize[0]} col-md-${props.columnSize[1]} col-xl-${props.columnSize[2]}`}
         id={props.idDiv}
      >
        <div className="form-group local-forms">
          <label>
            <span className="login-danger">*</span>
          </label>
          <textarea
            className="form-control"
            rows={props.rows}
            cols={props.cols}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            
          />
        </div>
      </div>
    </>
  );
}