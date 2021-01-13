import React, { useEffect, useState } from "react";
import Search from "./Search";
import { connect } from "react-redux";
import ClassCard from './ClassCard';
import { fetchClasses } from "../../actions/index";
// import '../styles/ClientStyle.css';
import '../../App.css';

const divStyle = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
  margin: "0 auto",
  flexWrap: "wrap",
  justifyContent: "center"
};

const ClientHome = props => {
  const [query, setQuery] = useState("");
  const [displayedClasses, setDisplayedClasses] = useState([]);
  const fetchClasses = props.fetchClasses;

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  useEffect(()=> {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    if (query.length < 1) {
      setDisplayedClasses(props.classes);
    } else {
      let searchResults = displayedClasses.filter(c => {
        return (
          c.class_name.toLowerCase().includes(query.toLowerCase()) ||
          c.class_type.toLowerCase().includes(query.toLowerCase()) ||
          c.start_time.toLowerCase().includes(query.toLowerCase()) ||
          c.class_intensity.toLowerCase().includes(query.toLowerCase()) ||
          c.class_duration.toString().includes(query) ||
          c.class_location.toLowerCase().includes(query.toLowerCase())
        );
      });

      setDisplayedClasses(searchResults);
    }
  }, [props.classes, query]);

  return (
    <div id="client-page">
      <div className="background">
        <br />
        <h1>Client Dashboard</h1>
        <Search handleInputChange={handleInputChange} query={query} />
        <div style={divStyle}>
          {displayedClasses.map((klass, index) => (
            <ClassCard 
            key={index} 
            klass={klass}
            index={index}
            />
          ))}
        </div>
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
export default connect(mapStateToProps, { fetchClasses })(ClientHome);