import React from "react";
export default function Alert(props) {
  const convert = (type) => {
    if (!type) return "";
    if (type === "danger") {
    return "Error";
  }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  return (
    <>
      <div style={{height:50}}>
        {props.text && (
          <div
            style={{ height: 40, textAlign: "left", paddingTop: 5 }}
            className={`alert alert-${props.text.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>
              {convert(props.text.type)} : {props.text.message}
            </strong>
          </div>
        )}
      </div>
    </>
  );
}