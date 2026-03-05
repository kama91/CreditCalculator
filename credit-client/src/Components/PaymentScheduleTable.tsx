import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PaymentScheduleItem } from '../types/credit';

interface PaymentScheduleTableProps {
  schedule: PaymentScheduleItem[];
}

const columns: ColumnsType<PaymentScheduleItem> = [
  {
    title: 'Номер платежа',
    dataIndex: 'paymentNumber',
    key: 'paymentNumber',
    width: 130,
  },
  {
    title: 'Дата платежа',
    dataIndex: 'paymentDate',
    key: 'paymentDate',
    width: 160,
  },
  {
    title: 'Платеж по телу кредита',
    dataIndex: 'paymentBody',
    key: 'paymentBody',
    width: 220,
  },
  {
    title: 'Платеж по процентам',
    dataIndex: 'paymentPercent',
    key: 'paymentPercent',
    width: 220,
  },
  {
    title: 'Остаток долга',
    dataIndex: 'balanceDebt',
    key: 'balanceDebt',
    width: 180,
  },
];

const PaymentScheduleTable = ({ schedule }: PaymentScheduleTableProps) => {
  return (
    <div className="schedule-container">
      <Table<PaymentScheduleItem>
        className="payments-table"
        columns={columns}
        dataSource={schedule}
        rowKey="paymentNumber"
        pagination={false}
        bordered
        size="small"
        sticky
        scroll={{ x: 'max-content', y: 'calc(100vh - 320px)' }}
      />
    </div>
  );
};

export default PaymentScheduleTable;
