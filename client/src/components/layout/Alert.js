import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.alertType === 'danger'? props.theme.dangerMessageColor : props.theme.okMessageColor};
  padding: 5px;
  margin: 5px;
  color: white;
`;

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <Container key={alert.id} alertType={alert.alertType}>
    { alert.msg }
  </Container>
));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return { alerts: state.alert };
}
export default connect(mapStateToProps)(Alert);