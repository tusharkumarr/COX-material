import React, { useEffect, useState } from 'react';
import { Space, Table,  Button } from 'antd';
import ServiceDao from './ServiceDao';

const TableMap = () => {
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
          
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
           
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
           
    //     },
    // ];
    

    const [editingKey, setEditingKey] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [addrowbuttonEnable, setrowbuttonEnable] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange=((event)=>{
        setSelectedFile(event.target.files[0]);
    })
    const handleUpload=(()=>{
        console.log(selectedFile);
        const reader = new FileReader();
    reader.onload = (e) => {
        const contents = e.target.result;
      
        const lines = contents.split('\n');
        let temp1=[]
       
        // console.log(lines);
        for(let i=1;i<lines.length-1;i++){
            let currLine=lines[i].slice(0, -2).split(',')
            // console.log(currLine[1]);
            let temp={
                key:currLine[0],
                name:currLine[1],
                age:parseInt(currLine[2]),
                address:currLine[3]
            

            }
            // setDataSource(prevDataSource => [...prevDataSource, temp]);
            temp1.push(temp)

            // // setDataSource(dataSource);
            // console.log(dataSource);
            

        }
        ServiceDao.addCSV(temp1)
      .then(data => {
        // Set the received data in the component state
        setDataSource(data);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      
    };
    reader.readAsText(selectedFile);
    
    


    })

    useEffect(() => {
        ServiceDao.fetchData()
      .then(data => {
        // Set the received data in the component state
        // console.log(data);
        setDataSource(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }, []);
    var [editingRow,setEditingRow]=useState({});
    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: (text,record) => {
                
                return (
                    <a>{dataSource.indexOf(record)+1}</a>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return dataSource.indexOf(record) === editingKey ? (
                    <input
                        placeholder={text}
                        value={editingRow.name}
                        onChange={(e) => handleChange(e.target.value, record,"name")}
                    />
                ) : (
                    <a>{text}</a>
                );
            },
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (text, record) => {
                return dataSource.indexOf(record) === editingKey ? (
                    <input
                        placeholder={text}
                        value={editingRow.age}
                        type="number"
                        onChange={(e) => handleChange(parseInt(e.target.value), record,"age")}
                    />
                ) : (
                    <a>{text}</a>
                );
            },

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return dataSource.indexOf(record) === editingKey ? (
                    <input
                        placeholder={text}
                        value={editingRow.address}
                        
                        onChange={(e) => handleChange(e.target.value, record,"address")}
                    />
                ) : (
                    <a>{text}</a>
                );
            },
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleSave()}>Save</Button>
                    <Button onClick={() => edit(record)}>Edit</Button>
                    <Button onClick={() => handleDeleteClick(record)}>Delete</Button>
                                     
                    
                </Space>
            ),
        },
    ];

    const handleDeleteClick = (record) => {
        ServiceDao.deleteRow(record)
      .then(data => {
        // Set the received data in the component state
        // console.log(data);
        
        setDataSource(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });



        // const updatedData = dataSource.filter((item) => item.key !== record.key);
        // const updatedData1 = updatedData.map((item) => {
            
        //     return { ...item, key: updatedData.indexOf(item) }; 
        // });
       

        // setDataSource(updatedData1);
        setrowbuttonEnable(true);
    };

    const handleChange = (value, key,keyid) => {
      
        // const updatedData = dataSource.map((item) => {
            
        //     if (item === key) {
        //         return { ...item, [keyid]: value };
        //     }
        //     return item;
        // });
        // setDataSource(updatedData);

        //new way to do it
        // console.log(editingRow);
        editingRow={
            
            ...editingRow,
           
            
            
            [keyid]:value,
        }
        setEditingRow(editingRow);
        

        
        
    };

    const edit = (record) => {
        
        
        setEditingRow(record);
        console.log(editingRow);
        
        setEditingKey(dataSource.indexOf(record));
    };
    const handleSave = () => {
        
       
        setrowbuttonEnable(true);
        // console.log(editingRow);
        var flag=true;
        if(flag){
            
            ServiceDao.updateRow(editingRow,editingKey)
      .then(data => {
        // Set the received data in the component state
        // console.log(data);
        setDataSource(data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

        }else{

        // console.log("end");
        // dataSource.push(editingRow);
        ServiceDao.addRow(editingRow)
      .then(data => {
   
        // console.log(data);
        setDataSource(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

        // console.log(dataSource);
        }
        setEditingKey('');
        setEditingRow('');
        
    };
    const addRow = () => {
        
        setrowbuttonEnable(false);
        setEditingKey(dataSource.length);
        console.log(dataSource[dataSource.length-1].key);
        
        dataSource.push({
            
                // key:dataSource.length+1+'',
                key:dataSource[dataSource.length-1].key+1,
                name: '',
                age: '',
                address: '',
                
        })
        setDataSource([
            ...dataSource,
           
        ]
        );
        console.log(dataSource);
        setEditingRow({
            
            key:dataSource[dataSource.length-1].key+'',
            name: '',
            age: '',
            address: '',
            
    })
    
        

        // setEditingKey(dataSource.length+1);
    };
    

    return( 
    <>
    <Table columns={columns} dataSource={dataSource} />
    <button  onClick={()=>addRow()} disabled={!addrowbuttonEnable}>Add row</button>
    <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
    </>);
};

export default TableMap;
