import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from '../../../../style';
import Feed from './Feed/Feed';
import { Redirect } from 'react-router-dom';
import "./Facebook.css";
import {
  getFacebookPostsCount,
  clearFacebookState
} from '../../../../../actions/socialMedia';
import { updateFlowActiveState } from '../../../../../actions/flowState';
import { Button, Container } from '@material-ui/core';
import StoryCreate from "./Feed/StoryCreate/StoryCreate";
import { IconChevronRight } from '@tabler/icons';
import { WINDOW_GLOBAL } from '../../../../../constants';

const Facebook = ({ data }) => {
  const { isLoggedInUser, translations, languageName } = useSelector(state => state.userAuth);
  const totalPostCount = useSelector(state => state.socialMedia.totalPostCount);

  const dispatch = useDispatch();
  const classes = useStyles();

  const fetch = async () => {
    dispatch(clearFacebookState());
    // fetch all facebook Ids and their counts
    const getRequest = {
      templateId: data.templateId,
      pageId: data._id,
      platform: data.type,
      order: data.pageDataOrder,
      language: languageName,
    }
    dispatch(getFacebookPostsCount(getRequest));
  };

  useEffect(() => {
    if (!isLoggedInUser) return <Redirect to="/" />;
    fetch();
    window.onbeforeunload = function() {
      return WINDOW_GLOBAL.RELOAD_ALERT_MESSAGE;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFlowActiveState());
  };

  return (
    <>
      <Container component="main" maxWidth="sm" className="facebookCard">
        <StoryCreate />

        <div className="facebookMainBody">
          {totalPostCount && totalPostCount > 0 ? 
            <Feed omitInteractionBar={data?.omitInteractionBar || false}/> 
          : <p>No Posts Exists!</p>}
        </div>

        <div className="fbNextBotton">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '12px' }}
            onClick={handleSubmit}
            className={classes.submit}
            endIcon={<IconChevronRight />}
          >
            {translations?.next || "NEXT"}
          </Button>
        </div>
      </Container>
    </>
  )
};

export default Facebook;
