import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchClasses, scheduleClass, unscheduleClass } from "../../actions/index";
import ClassCard from './ClassCard';

import "../../App.css";

const ClientHome = props => {
  const [displayedClasses, setDisplayedClasses] = useState(props.classes);
  const fetchClasses = props.fetchClasses;

  const divStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    margin: "0 auto",
    flexWrap: "wrap",
    justifyContent: "center"
  };

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses])

  return (
    <div id="client-page">
      <div className="background" >
        <h1>Scheduled Classes</h1>

        {props.scheduledClasses.length !== 0 ? (
          <div className='card' style={divStyle}>
            {props.scheduledClasses.map((item, index) => (
              <ClassCard key={index} item={item} index={index} unscheduleClass={props.unscheduleClass} setUnScheduledClass={unscheduleClass} setDisplayedClasses={setDisplayedClasses} />
            ))}
          </div>
        ) : (
            <h1> </h1>
          )}

      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    classes: state.classes,
    scheduledClasses: state.scheduledClasses
  };
};
export default connect(mapStateToProps, { fetchClasses, scheduleClass, unscheduleClass })(
  ClientHome
);