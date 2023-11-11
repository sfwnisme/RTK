import { cloneElement, memo } from "react";

let Loading = ({ children, loading, isSuccess, error, isError }) => {

  const elementType = children?.type?.render?.displayName;
  const renderHandler = () => {
    if (elementType === "Button") {
      const cloneButton = cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : isError ? (
            <>
              {children}
              <>
                <br />
                {error}
              </>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>
        {loading ? (
          <tr>
            <td>loading please wait...</td>
          </tr>
        ) : isError ? (
          <tr>
            <td>{error}</td>
          </tr>
        ) : (
          children
        )}
      </>
    );
  };

  return renderHandler()
}

Loading = memo(Loading)

export default Loading