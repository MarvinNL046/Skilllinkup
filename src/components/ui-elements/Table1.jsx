export default function Table1() {
  return (
    <>
      <div className="ui-content">
        <h5 className="title">Table</h5>
        <div className="table-style1 table-responsive mb-4 mb-lg-5">
          <table className="table table-borderless">
            <thead className="thead-light">
              <tr>
                <th className="text-base font-medium" scope="col">
                  Description
                </th>
                <th className="text-base font-medium" scope="col">
                  Hour
                </th>
                <th className="text-base font-medium" scope="col">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Design UX and UI</td>
                <td>14</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Design UX and UI</td>
                <td>14</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Design UX and UI</td>
                <td>14</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Design UX and UI</td>
                <td>14</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
