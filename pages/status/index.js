import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);

  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div>
      <h1>Um Status</h1>
      <pre>
        <UpDatedAt />
        <DataBaseStatus />
      </pre>
    </div>
  );
}

function UpDatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAtText = "Loading...";
  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString();
  }
  return <p>Última atualização: {updateAtText}</p>;
}

function DataBaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Loading...";
  if (!isLoading && data) {
    databaseStatusInformation = (
      <div>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>Conexões máximas: {data.dependencies.database.max_connections}</p>
        <p>Conexões abertas: {data.dependencies.database.opened_connections}</p>
      </div>
    );
  }
  return (
    <>
      <h2>Status da base de dados:</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
