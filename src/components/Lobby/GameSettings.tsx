import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting } from '../../redux/reducers/room/roomActions';
import { IGameSettings, IRootState } from '../../types';
import GameCards from '../shared/GameCards/GameCards';
import Switcher from '../shared/Switcher';
import Title from '../shared/Title';

const GameSettings = (): JSX.Element => {
  const dispatch = useDispatch();
  const settings = useSelector((state: IRootState) => state.room.gameSettings);

  const handleChange = (event: ChangeEvent<any>) => {
    const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    dispatch(setSetting(event.target.name as keyof IGameSettings, value));
  };

  return (
    <div>
      <div className="setting-container">
        <Title text="Game Settings:" variant="h5" align="left" />
        <Switcher
          label="Scrum master as Player:"
          name="ScrumMasterAsPlayer"
          value={settings.ScrumMasterAsPlayer}
          handleChecked={handleChange}
        />
        <Switcher
          label="Flip the cards when all voted:"
          name="flipCardsWhenAllVoted"
          value={settings.flipCardsWhenAllVoted}
          handleChecked={handleChange}
        />
        <Switcher
          label="Changing card if all cards flipped:"
          name="changingCardInRoundEnd"
          value={settings.changingCardInRoundEnd}
          handleChecked={handleChange}
        />
        <Switcher
          label="Add players if the game has started:"
          name="addPlayerWhenGameStarted"
          value={settings.addPlayerWhenGameStarted}
          handleChecked={handleChange}
        />
        <Switcher
          label="Is timer needed:"
          name="isTimerNeeded"
          value={settings.isTimerNeeded}
          handleChecked={handleChange}
        />

        <FormControl fullWidth>
          <InputLabel id="scoreTypeId">Score type</InputLabel>
          <Select labelId="scoreTypeId" name="scoreType" value={settings.scoreType} onChange={handleChange} fullWidth>
            <MenuItem value="power of 2">Power of 2</MenuItem>
            <MenuItem value="fibonacci">Fibonacci</MenuItem>
            <MenuItem value="story point">Story point</MenuItem>
          </Select>
        </FormControl>
        {settings.isTimerNeeded && (
          <TextField
            name="timer"
            label="Timer"
            type="time"
            value={settings.timer}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 60,
            }}
          />
        )}
      </div>
      <GameCards />
    </div>
  );
};

export default GameSettings;
