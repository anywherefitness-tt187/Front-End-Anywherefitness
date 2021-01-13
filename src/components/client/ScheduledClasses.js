import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchClasses, fetchRegisteredClients, scheduleClass, unscheduleClass } from "../../actions/index";
import ClassCard from './ClassCard';

import "../../App.css";

const ScheduledClasses = props => {
  const [scheduledClasses, setScheduledClasses] = useState(props.classes);
  const fetchClasses = props.fetchClasses;
  const fetchRegisteredClients = props.fetchRegisteredClients;

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
    fetchRegisteredClients();

  }, [fetchClasses, fetchRegisteredClients]);

  useEffect(() => {
    var classes = [];

    props.registeredClients.forEach(registeredClient => {
      const {client_name, class_id} = registeredClient;
      if (client_name === localStorage.getItem("username")) {
        var klass = props.classes.find((klass) => { return klass.id === class_id});
        if (klass) {
          classes.push({...klass, registeredClient});
        }
      }
    });

    setScheduledClasses(classes);
  }, [props.registeredClients, props.classes]);

  return (
    <div id="client-page">
      <div className="background" >
        <h1>Scheduled Classes</h1>

          <div className='card' style={divStyle}>
            {scheduledClasses.map((scheduledClass, index) => (
              <ClassCard key={index} klass={scheduledClass} index={index} isScheduled={true}/>
            ))}
          </div>

      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    classes: state.classes,
    registeredClients: state.registeredClients
  };
};
export default connect(mapStateToProps, { fetchClasses, fetchRegisteredClients, scheduleClass, unscheduleClass })(ScheduledClasses);