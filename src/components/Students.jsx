import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form';

function Students() {
  
  const [studentsList, setStudentsList] = useState([])
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  // const [selectedStudent, setSelectedStudent] = useState<Students | null>(null);
  

  //to get students list from json file
  const getStudentsList = async () => {
    try {
      const res = await fetch('http://localhost:3000/students')
      const stds = await res.json()
      setStudentsList(stds)
    } catch (error) {
      console.error('Error fetching students list:', error)
    }
  }
  useEffect(() => {
    getStudentsList()
  }, []) 

  //to get badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'college':
        return <Badge bg="success" className="">In College</Badge>;
      case 'outside':
        return <Badge bg="warning" className="text-white">Outside</Badge>;
      case 'hostel':
        return <Badge bg="danger">Hostel</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };
  
  console.log(status)

  return (
    // card for students list
    <div className='card p-3'>
      
      {/* card header for search and filter */}

      <div className='card-header'>
        <div className="row d-flex justify-content-between align-items-center">
          
          <form className='col-8 p-2'>
            <input type="text" className='form-control bg-dark bg-opacity-10' placeholder='Search by name or roll no '
            onChange={(e)=>setSearch(e.target.value)} />
          </form>
          
          <form className='col-3 p-2'>
            <Form.Select aria-label="Default select example" className='bg-dark bg-opacity-10' onChange={(e)=>setStatus(e.target.value)}>
              <option>All</option>
              <option value="In College">In College</option>
              <option value="Outside">Outside</option>
              <option value="Hostel">Hostel</option>
            </Form.Select>
          
          </form>
        </div>
      </div>

      {/* card-body for students list */}
      
      <div className='card-body bg-secondary bg-opacity-10 mt-3 rounded-4'>

        <p className='p-2'>Showing {studentsList.length} students</p>
        {/* Iterating through students */}
        {
          studentsList.length > 0 ? (
            studentsList.filter((studentObj) => {
              if (search ==='') {
                return status.toLowerCase() === 'all' ? studentObj : status.toLowerCase() === 'in college' ? studentObj.status === 'college' : status.toLowerCase() === 'outside' ? studentObj.status === 'outside' : studentObj.status === 'hostel'
              }else{
              return search.toLowerCase()=== '' ? studentObj : studentObj.name.toLowerCase().includes(search.toLowerCase()) || studentObj.id.toLowerCase().includes(search.toLowerCase())
              }
            } 
            ).map((studentObj) => (
              <div key={studentObj.id} className="col-12 me-3 mb-3 p-3 bg-white rounded-5 shadow-sm">
                <h5>{studentObj.name}</h5>
                <p>Roll No: {studentObj.id} • Room No: {studentObj.room} {getStatusBadge(studentObj.status)}</p>
                <p>∧ {studentObj.location}   🕑 Last Seen:  {studentObj.lastSeen}</p>
              </div>
            ))
          ) : (
            <p>No students found.</p>
          )
        }
      </div>
    </div>
  )
}

export default Students
