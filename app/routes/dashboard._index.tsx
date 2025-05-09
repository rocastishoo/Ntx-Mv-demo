import ClientList from "~/components/ClientList";

export default function DashboardIndexPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen h-full w-full bg-base-200 p-6">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Enter New Client Name</h2>
          <form method="post" className="form-control">
            <label className="label">
              <span className="label-text">Client Name</span>
            </label>
            <input
              type="text"
              placeholder="Bad Bunny"
              className="input input-bordered w-full"
              name="clientName"
              required
            />
            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Go to Client Page
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-96 mt-6">
        <ClientList />
      </div>
    </div>
  );
}
