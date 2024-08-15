// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, toaddDate, toaddTitle, isStarred} = appointmentDetails
  const newStarImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const newDate = format(new Date(toaddDate), 'dd MMMM yyyy, EEEE')

  const onClickStarredIcon = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item-container">
      <div className="appointment-content">
        <div className="appointment-content-image">
          <p className="content-heading">{toaddTitle}</p>
          <button
            type="button"
            className="button"
            data-testId="star"
            onClick={onClickStarredIcon}
          >
            <img src={newStarImg} alt="star" className="content-image" />
          </button>
        </div>
        <p className="content-para">Date: {newDate}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
