import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TablesAdmin from '../pages/Admin/TablesAdmin'; // Importez TablesAdmin
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* Remplacez l'un des composants de table par TablesAdmin */}
        <TablesAdmin />
        {/* <TableTwo /> */}
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};

export default Tables;
