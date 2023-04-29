import React from 'react';
import IconButton from '@mui/material/IconButton';
import {Stack, } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Tooltip from '../../components/Tooltip';
import VolumeSlider from '../settings/VolumeSlider';
import {
  PlayArrowOutlined,
  ClearAll,
  ChevronRight,
  ChevronLeft,
  Pause,
} from "@mui/icons-material";
import {BpmControls} from '../playback';

import { useAppDispatch } from '../../hooks/hooks'
import { play, pause, selectIsPlaying } from '../playback/playbackSlice'

import { selectCanRedo, selectCanUndo, clearEnabledSteps } from './gridSlice';

import { useSelector } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo'

// the UI above the grid

const GridControls = () => {
  const isPlaying = useSelector(selectIsPlaying)
  const dispatch = useAppDispatch();
 
  const canUndo = useSelector(selectCanUndo);
  const canRedo = useSelector(selectCanRedo);

  const handleClear = () => {
    dispatch(clearEnabledSteps())
  }

  const handleUndo = () => {
    dispatch(UndoActionCreators.undo())
  }

  const handleRedo = () => {
    dispatch(UndoActionCreators.redo())
  }

  const handlePlay = () => {
    isPlaying ? dispatch(pause()) : dispatch(play())
  }

  const onKeyDown = (e: any) => {
    if(e.key === ' ') {
      e.stopPropagation(); // do this to prevent o 
    }
  }

  return (
    <Stack direction="row" alignItems="center" gap={0} width={"102.5%"}>
      {/* Left Nav Group */}
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        width="300px"
        gap={0}
      >
        {/* VOLUME */}
        <VolumeSlider />
      </Stack>

      {/* Middle Nav Group */}
      <Stack
        sx={{ ml: "auto" }}
        flexGrow={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {/* PLAYBACK BUTTONS */}
        <IconButton
          color="inherit"
          data-cy-button="playback"
          onClick={handlePlay}
        >
          {isPlaying ? (
            <Pause data-cy-icon="pause" fontSize="large" />
          ) : (
            <PlayArrowOutlined data-cy-icon="play" fontSize="large" />
          )}
        </IconButton>
      </Stack>

      {/* Right Nav Group */}
      <Stack
        sx={{ ml: "auto" }}
        width={300}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        gap={0}
      >
        <Tooltip title="BPM">
          <span>
            <BpmControls />
          </span>
        </Tooltip>

        {/* UNDO */}
        <Tooltip title="Undo">
          <span>
            <IconButton
              onClick={handleUndo}
              disabled={!canUndo}
              color="inherit"
              data-cy-button="undo"
            >
              <ChevronLeft fontSize="medium" />
            </IconButton>
          </span>
        </Tooltip>

        {/* REDO */}
        <Tooltip title="Redo">
          <span>
            <IconButton
              onClick={handleRedo}
              disabled={!canRedo}
              data-cy-button="redo"
              color="inherit"
            >
              <ChevronRight fontSize="medium" />
            </IconButton>
          </span>
        </Tooltip>

        {/* CLEAR ALL */}
        <Tooltip title="Clear">
          <IconButton
            data-cy-button="clearTrackSteps"
            onClick={handleClear}
            color="inherit"
          >
            <ClearAll fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default GridControls;