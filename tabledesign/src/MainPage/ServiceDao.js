import axios from "axios";

class ServiceDao{
    static fetchData() {
      
    return axios.get('http://localhost:5000')
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    }
    static addRow(updatedObj) {
        console.log(updatedObj);
       
    return axios.post('http://localhost:5000/postData',updatedObj)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    }
    static updateRow(updatedObj,ind) {
        console.log(updatedObj);
        console.log(ind);
       
    return axios.put('http://localhost:5000/updateRow',{'newobj':updatedObj,'ind':ind})
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    }
    static deleteRow(deletingObj) {
        
        
       
    return axios.delete('http://localhost:5000/deleteRow',{ data: deletingObj })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
    }
    static addCSV(newData) {
        
        
       
        return axios.put('http://localhost:5000/addDataFromCSV',{ data: newData })
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
        }
}
export default ServiceDao;