import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting } from '../../redux/reducers/gameSettings/gameSettingsActions';
import { IGameSettings, IRootState } from '../../types';
import Switcher from '../shared/Switcher';
import Title from '../shared/Title';
import GameCards from '../GameCards/GameCards';

const GameSettings = (): JSX.Element => {
  const dispatch = useDispatch();
  const settings = useSelector((state: IRootState) => state.gameSettings);

  const handleChange = (event: ChangeEvent<any>) => {
    const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    dispatch(setSetting(event.target.name as keyof IGameSettings, value));
  };

  return (
    <div className="card-container setting-container">
      <Title text="Game Settings:" />
      <Switcher label="Scrum master as Player:" name="ScrumMasterAsPlayer" handleChecked={handleChange} />
      <Switcher label="flip the cards when all voted:" name="flipCardsWhenAllVoted" handleChecked={handleChange} />
      <Switcher label="Changing card in round end:" name="changingCardInRoundEnd" handleChecked={handleChange} />
      <Switcher
        label="add players if the game has started:"
        name="addPlayerWhenGameStarted"
        handleChecked={handleChange}
      />
      <Switcher label="Is timer needed:" name="isTimerNeeded" handleChecked={handleChange} />

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
      <GameCards />
    </div>
  );
};

export default GameSettings;
