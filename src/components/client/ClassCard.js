import React from "react";
import { connect } from "react-redux";
import { scheduleClass, unscheduleClass } from "../../actions/index";
import styled from "styled-components";

const StyledClassCard = styled.div`
    min-width: 450px;
    background-color: #687864;
    color: #f7f9fb;
    box-sizing: border-box;
    margin: 2.5rem;
    padding: 1rem;
    border: 2px solid #5085A5;
    border-radius: 25px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    @media (max-width: 800px) {
        min-width: 50vw;
    }
`;

const FlexboxRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FlexboxCol = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;


const ClassName = styled.h2`
    font-size: 2rem;
    margin: 0 auto;
    text-align: left;
`;

const InstructorAndLocation = styled.p`
    font-size: 1rem;
    font-style: oblique;
    text-align: left;
`;

const IntensityText = styled.span`
    font-weight: bold;
`;

const IntensityDescription = styled.p`
    font-size: 1.25rem;
    color: #f7f9fb;
    line-height: 1.5rem;
    margin-left: 10%;
`;

const StyledHr = styled.hr`
    width: 100%;
    border: 2px solid #BDBDBD;
`;

const ClassTime = styled.p`
    font-size: 1.25rem;
    font-weight: bold;
    color: #f7f9fb;
    margin-top: 0.5rem;
`;

const Attendees = styled.p`
    font-size: 1rem;
    color: #f7f9fb;
    
`;


const ClassCard = function (props) {
    const {
        klass,
        index,
        scheduleClass,
        unscheduleClass,
        isScheduled,
    } = props;

    const handleClick = () => {
        if (isScheduled) { // unschedule
            unscheduleClass(klass.registeredClient.id);
        } else { // schedule
            const classId = klass.id;
            const params = {
                client_name: localStorage.getItem("username")
            };
            scheduleClass(classId, params);
        }
    }

    return (
        <StyledClassCard key={index}>
            <FlexboxRow>
                <div>
                    <ClassName>{klass.class_name}</ClassName>
                    <InstructorAndLocation> at {klass.class_location}</InstructorAndLocation>
                </div>
                <IntensityDescription>
                    <IntensityText>
                        {klass.class_intensity}
                    </IntensityText>
                    <br />Intensity<br />{klass.class_type}
                </IntensityDescription>
            </FlexboxRow>
            <StyledHr />
            <FlexboxRow>
                <FlexboxCol>
                    <ClassTime>{klass.start_time}<br />({klass.class_duration} min)</ClassTime>
                </FlexboxCol>

                <FlexboxCol>
                    <Attendees>
                        Attending: {klass.attendees} / {klass.class_max_size}
                    </Attendees>

                    <button onClick={handleClick}>
                        {!isScheduled ? "Schedule Class" : "Unschedule Class"}
                    </button>

                </FlexboxCol>
            </FlexboxRow>
        </StyledClassCard>
    )
}

const mapStateToProps = state => {
    return {
    };
};
export default connect(mapStateToProps, { scheduleClass, unscheduleClass })(ClassCard);