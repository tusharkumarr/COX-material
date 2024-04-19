import React, { useState } from 'react';
import { Button,ConfigProvider } from 'antd';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import ServiceDao from './ServiceDao';
import axios from 'axios';


const defaultData = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `Activity Name ${index}`,
    description: 'This activity is really fun',
    state: 'open',
    created_at: 1590486176000,
  };
});



export default () => {
  
  const [editableKeys, setEditableRowKeys] = useState(() =>
    defaultData.map((item) => item.id)
  );
  
  // defaultData=a.fetchData();
 
  const [dataSource, setDataSource] = useState(() => defaultData);

  const handleDelete = (record) => {
    const newData = dataSource.filter((item) => item.id !== record.id);
    setDataSource(newData);
    setEditableRowKeys(newData.map((item) => item.id));
  };

  const columns = [
    {
      title: 'Activity Name',
      dataIndex: 'title',
      width: '30%',
      
     
      
      formItemProps: {
        
        rules: [
          {
            required: true,
            whitespace: true,
            message: 'This field is required',
          },
          {
            max: 16,
            whitespace: true,
            message: 'Maximum 16 characters',
          },
          {
            min: 6,
            whitespace: true,
            message: 'Minimum 6 characters',
          },
        ],
        
        
      },
    },
    {
      title: 'Status',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: 'All', status: 'Default' },
        open: { text: 'Unresolved', status: 'Error' },
        closed: { text: 'Resolved', status: 'Success' },
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      valueType: 'option',
      width: 250,
      render: (_, record) => {
        return (

            
          <Button onClick={() => handleDelete(record)}>Delete</Button>
          
        );
      },
    },
    
  ];
  const a=()=>{
    console.log("a");
    axios.get('http://localhost:5000')
    .then(response => {
      // Extract data from the response
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; // You might want to handle errors differently
    });
  
  }
  a()

  return (
    // <ConfigProvider locale={enUS}> {/* Assuming English (US) locale */}
      
    
    <>
    
      <EditableProTable
        headerTitle="Editable Table"
        columns={columns}
        rowKey="id"
        scroll={{ x: 960 }}
        value={dataSource}
        onChange={setDataSource}
        
    
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="save"
            onClick={() => console.log(dataSource)}
          >
            Save Data
          </Button>,
        ]}
        
        editable={{
          type: 'multiple',
          editableKeys,
          
          actionRender: (row, config, defaultDom) => [
            defaultDom.save,
            defaultDom.cancel,
            defaultDom.delete,
            
            
          ],
          onValuesChange: (_, recordList) => setDataSource(recordList),
          onChange: setEditableRowKeys,
        }}
      />

      <ProCard title="Table Data" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{ style: { width: '100%' } }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
    // </ConfigProvider>
  );
};
