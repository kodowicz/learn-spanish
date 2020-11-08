import React from "react";
import { connect } from "react-redux";
import {
  setPageScroll,
  setContentHeight,
  scrollToTop
} from "../store/actions/navigationActions";
import { ContentWrapper } from "../components/Background";

const ContentContainer = props => {
  return (
    <ContentWrapper
      isScrolledToTop={props.isScrolledToTop}
      contentHeight={props.contentHeight}
      setPageScroll={props.setPageScroll}
      setContentHeight={props.setContentHeight}
      scrollToTop={props.scrollToTop}
    >
      {props.children}
    </ContentWrapper>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isScrolledToTop: state.navigation.isScrolledToTop,
  contentHeight: state.navigation.contentHeight
});

export default connect(
  mapStateToProps,
  { setPageScroll, setContentHeight, scrollToTop }
)(ContentContainer);
