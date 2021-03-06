import React from 'react';
import './students.css'
import Trainee from './Trainee';
import Modal from 'antd/es/modal';
class TraineeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrainees:[],
      deleteModalVisible:false,
      deleteTrainee:'',
    };
  }

  handleAddButtonClick = () => {

  }

  componentDidMount() {
    this.getTraineeList();
  }

  handleAddTraineeSuccess(){
    this.getTraineeList();
  }

  getTraineeList(){
    const url = 'http://localhost:8080/trainees?grouped=false'
    fetch(url)
      .then(result => {
        return result.json()
      })
      .catch(Error)
      .then(json => {
        this.setState({
          allTrainees:json
        })
      })
  }

  handleCancel = () => {
    this.setState({
      deleteModalVisible: false,
    });
  };


  handelDelete = (trainee) => {
    this.setState({
      deleteModalVisible: true,
      deleteTrainee:trainee,
    });
  }

  deleteTrainee = ()=> {
    const { id } = this.state.deleteTrainee;
    const url = `http://localhost:8080/trainees/${id}`
    const options = {
      method:'DELETE'
    }
    fetch(url, options)
      .then(response => {
        if (response.status === 204){
          this.getTraineeList();
        }
      })
      .catch(Error)
    this.setState({
      deleteModalVisible: false,
    });
  }

  render() {
    const  allTrainees = this.state.allTrainees.map(
      item => <Trainee message={item}
                       key={item.id}
                       handelDelete={this.handelDelete}/>

)
    const { id ,name } = this.state.deleteTrainee;
    return (

      <div>
        <h1>学员列表</h1>
        <div className="student-container">
          <div className="student-list">
            {allTrainees}
            <button className='btn-add-stu'
                    onClick={() => this.props.history.push('/trainee/create')}>
                <a href="#/trainee/create">+ 添加学员</a>
              </button>
          </div>
        </div>
        <Modal
          title="删除学员"
          visible={this.state.deleteModalVisible}
          onOk={this.deleteTrainee}
          onCancel={this.handleCancel}
        >
          <p>是否要删除学员{id}.{name}？</p>
        </Modal>
      </div>
      );
    }
}

export default TraineeContainer;