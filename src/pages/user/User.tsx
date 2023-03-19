import Table, { ColumnsType, TablePaginationConfig } from "antd/es/table";
import React, { ChangeEvent, useMemo, useState } from "react";
import useGet from "../../api/useGet";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { Input } from "antd";
import useDebounce from "../../hook/useDebounce";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDay: string;
  gender: "nam" | "nữ";
}
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export const User = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { data, isFetching, refetch, isError } = useGet("/user", {
    page: tableParams.pagination?.current,
    limit: tableParams.pagination?.pageSize,
    sort: tableParams.sortField,
    order: tableParams.sortOrder,
    filter: {
      name: debouncedValue,
      email: debouncedValue,
      phone: debouncedValue,
    },
  });

  const columns: ColumnsType<User> = useMemo(
    () => [
      {
        title: "Họ Tên",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Ngày sinh",
        dataIndex: "birthDay",
        key: "birthDay",
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        filters: [
          { text: "Nam", value: "nam" },
          { text: "Nữ", value: "nữ" },
        ],
      },

      {
        title: "Ngày đăng ký",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: true,

        filterSearch: true,
        render: (createdAt: any) => {
          const date = new Date(createdAt);
          return date.toLocaleDateString();
        },
      },
    ],
    [data]
  );
  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<User> | any
  ) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: pagination.current,
      },
      sortField: sorter.field as string | undefined,
      sortOrder: (sorter.order
        ? sorter.order === "ascend"
          ? "ASC"
          : "DESC"
        : sorter.order) as string | undefined,
    });
    refetch();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
    refetch();
  }, [debouncedValue]);

  React.useEffect(() => {
    refetch();
  }, [JSON.stringify(tableParams)]);
  React.useEffect(() => {
    if (data && !isError) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.total,
        },
      });
    }
  }, [JSON.stringify(data)]);

  return (
    <div>
      <Input.Search
        size="large"
        placeholder="Tìm kiếm tên, email, số điện thoại khách hàng"
        value={value}
        onChange={handleChange}
        className="w-1/3 my-5 "
      />
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data?.data}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      ></Table>
    </div>
  );
};
