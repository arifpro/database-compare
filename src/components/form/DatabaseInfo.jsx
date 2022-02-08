const DatabaseInfo = ({ id, information, databaseSwitch, databaseBreak }) => {
  const { databaseList, url, selectedDatabase } = information;

  return (
    <section>
      <form id={id}>
        <span>{url}</span>

        <select value={selectedDatabase} onChange={databaseSwitch}>
          {databaseList.map((databaseName) => (
            <option key={databaseName} value={databaseName}>
              {databaseName}
            </option>
          ))}
        </select>

        <button type="button" onClick={databaseBreak}>
          编辑
        </button>
      </form>
    </section>
  );
};

export default DatabaseInfo;
