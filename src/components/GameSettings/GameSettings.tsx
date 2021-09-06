import { TextField } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting } from '../../redux/reducers/gameSettings/gameSettingsActions';
import { IGameSettings, IRootState } from '../../types';
import Switcher from '../shared/Switcher';
import Title from '../shared/Title';

const GameSettings = (): JSX.Element => {
  const dispatch = useDispatch();
  const settings = useSelector((state: IRootState) => state.gameSettings);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatch(setSetting(e.target.name as keyof IGameSettings, value));
  };

  return (
    <div className="card-container setting-container">
      <Title text="Game Settings:" />
      <Switcher label="Scrum master as Player:" name="ScrumMasterAsPlayer" handleChecked={handleChange} />
      <Switcher label="Changing card in round end:" name="changingCardInRoundEnd" handleChecked={handleChange} />
      <Switcher label="Is timer needed:" name="isTimerNeeded" handleChecked={handleChange} />
      <TextField
        autoComplete="off"
        name="scoreType"
        label="Score type"
        value={settings.scoreType}
        onInput={handleChange}
        fullWidth
        autoFocus
      />
      <TextField
        autoComplete="off"
        name="scoreTypeShort"
        label="Score type (Short)"
        value={settings.scoreTypeShort}
        onInput={handleChange}
        fullWidth
        autoFocus
      />
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
  );
};

export default GameSettings;
