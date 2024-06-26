
import '../assets/css/profile.css'

function CounsellorProfileView({counsellor}) {
  console.log('counsellor from profile view: ', counsellor)
  const image_path = counsellor && counsellor.image ? counsellor.image.replace(/\\/g, '/') : null;

  return (
<div className="profile-viewer-container">
  <div className="profile-main-image">
    <div
      className="profile-image"
      style={
        {
            backgroundImage: 'url(/' + image_path + ')'
        }
      }
    />
    <div className="profile-name">
      <h3>
        {counsellor.username}
      </h3>
    </div>
  </div>
  <div className="profile-info">
    <div className="profile-data">
      <span className="data">
        <span>
            {counsellor.username}
        </span>
      </span>{" "}
      <span className="label">Username</span>
    </div>
    {/* <div className="profile-data">
      <span className="data">
        <span>
            {counsellor.age}
        </span>
      </span>{" "}
      <span className="label">Age</span>
    </div> */}
    {/* <div className="profile-data">
      <span className="data">
        <span>
            {counsellor.balance}
        </span>
      </span>{" "}
      <span className="label">Balance</span>
    </div> */}
    {/* <div className="profile-data">
      <span className="data">
        <span id="mail">
            {counsellor.email}
        </span>
      </span>{" "}
      <span className="label">Mail Address</span>
    </div> */}
    <div className="profile-data">
      <span className="data">
        <span>
            {counsellor.expected_fee}$
        </span>
      </span>{" "}
      <span className="label">Fee</span>
    </div>
    <div className="profile-data">
      <span className="data">
        <span>
            {counsellor.experience}
        </span>
      </span>{" "}
      <span className="label">Experience</span>
    </div>
    <div className="profile-data">
      <span className="data">
        <span>
            {counsellor.gender}
        </span>
      </span>{" "}
      <span className="label">Gender</span>
    </div>
  </div>
</div>
  )
}
export default CounsellorProfileView