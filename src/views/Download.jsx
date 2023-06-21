import CSVTable from "../components/CSVTable";

const Download = () => {
  return (
    <div>
      <CSVTable
        url="/DB/6.Download/download.csv"
        render={{
          DatasetID: (record) => {
            return (
              <a href={`/DB/6.Download/download/${record.DatasetID}.rds`}>
                {record.DatasetID}
              </a>
            );
          },
        }}
      />
    </div>
  );
};

export default Download;
