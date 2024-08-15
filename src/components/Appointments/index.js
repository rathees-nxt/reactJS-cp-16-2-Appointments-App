import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentList: [],
    toaddTitle: '',
    toaddDate: '',
    isActiveStarred: false,
  }

  updateTitle = event => {
    this.setState({toaddTitle: event.target.value})
  }

  updateDate = event => {
    this.setState({toaddDate: event.target.value})
  }

  isActive = () => {
    const {isActiveStarred} = this.state
    this.setState({isActiveStarred: !isActiveStarred})
  }

  toAddAppointment = event => {
    event.preventDefault()
    const {toaddDate, toaddTitle} = this.state
    const newAppointment = {
      id: uuidv4(),
      toaddTitle,
      toaddDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      toaddDate: '',
      toaddTitle: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getFilteredStarredList = () => {
    const {appointmentList, isActiveStarred} = this.state
    if (isActiveStarred) {
      return appointmentList.filter(eachFilter => eachFilter.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {toaddDate, toaddTitle, isActiveStarred} = this.state
    const filterClassName = isActiveStarred
      ? 'starred-btn-filled'
      : 'starred-btn-empty'
    const filteredStarredList = this.getFilteredStarredList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="appointment-input-container">
            <form className="form" onSubmit={this.toAddAppointment}>
              <h1 className="app-heading">Add Appointment</h1>
              <label className="title-heading" htmlFor="title1">
                TITLE
              </label>
              <input
                type="text"
                placeholder="Title"
                className="title-input"
                onChange={this.updateTitle}
                value={toaddTitle}
                id="title1"
              />
              <label className="title-heading" htmlFor="title2">
                DATE
              </label>
              <input
                type="date"
                placeholder="dd/mm/yy"
                className="date-input"
                onChange={this.updateDate}
                value={toaddDate}
                id="title2"
              />
              <br />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hori-line" />
          <div className="starred-container">
            <h1 className="para">Appointments</h1>
            <button
              type="submit"
              className={`starred-btn ${filterClassName}`}
              onClick={this.isActive}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {filteredStarredList.map(appointment => (
              <AppointmentItem
                key={appointment.id}
                toggleIsStarred={this.toggleIsStarred}
                appointmentDetails={appointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
