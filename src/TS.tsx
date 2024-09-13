import React, { useCallback, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import music from "./2019-11-30_-_No_More_Good_-_David_Fesliyan.mp3";
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import Snackbar from "@material-ui/core/Snackbar";
import { Delete, Edit } from "@mui/icons-material";
import { riddles } from "./makeData";
import { stageText } from "./makeData";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { InputGroup } from "react-bootstrap";
import { blue } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";

const colorPrimary = blue[500];
const colorWhite = "#FFFFFF";

export type Person = {
  title: string;
  description: string;
  deadline: string;
  priority: string;
  isComplete: boolean;
};

export type Riddle = {
  question: string;
  answer: string;
};

const Example = () => {
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [riddleIndex, setRiddleIndex] = React.useState(0);
  const [isToastrOpen, setToastrOpen] = React.useState(false);
  const [toastrText, setToastrText] = React.useState("");
  const [stage, setStage] = React.useState(0);
  const [buttonHealth, setButtonHealth] = React.useState(10);

  const openModal = (open: boolean) => {
    if (stage >= 3) {
      hurtMonster();
    }
    setCreateModalOpen(open);
    setRiddleIndex(Math.floor(Math.random() * riddles.length));
  };

  const openToastr = (text: string) => {
    setToastrText(text);
    setToastrOpen(true);
  };

  const closeToastr = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setToastrOpen(false);
  };

  const handleIncorrectButton = () => {};

  const createButtonMaze = (randChance: number) => {
    let maze = [];
    let buttonsPerRow = 23;
    let rows = 16;
    let targetIndex = Math.floor(Math.random() * (buttonsPerRow * rows));
    for (let i = 0; i < buttonsPerRow * rows; i++) {
      let chanceOfFailure = Math.floor(Math.random() * randChance);
      if (i == targetIndex) {
        maze.push(
          <Button
            onClick={() => openModal(true)}
            color="success"
            variant="text"
            key={i}
          >
            <TaskAltIcon sx={{ color: "rgb(20, 20, 20)" }} />
          </Button>,
        );
        //if it randomly fails to determine location
      } else if (chanceOfFailure > 0) {
        maze.push(
          <Button
            onClick={() => openModal(true)}
            color="warning"
            variant="text"
            key={i}
          >
            <QuestionMarkIcon sx={{ color: "rgb(20, 20, 20)" }} />
          </Button>,
        );
        //if they're in the same row
      } else if (
        Math.floor(i / buttonsPerRow) == Math.floor(targetIndex / buttonsPerRow)
      ) {
        //rightarrow;
        if (i < targetIndex) {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <EastIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
          //leftarrow
        } else {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <WestIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
        }
        //if they're in the same column
      } else if (
        Math.floor(i % buttonsPerRow) == Math.floor(targetIndex % buttonsPerRow)
      ) {
        //downarrow;
        if (i < targetIndex) {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <SouthIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
          //uparrow
        } else {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <NorthIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
        }
        //if otherwise above
      } else if (i < targetIndex) {
        //if left quadrant
        if (
          Math.floor(i % buttonsPerRow) <
          Math.floor(targetIndex % buttonsPerRow)
        ) {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <SouthEastIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
          //otherwise right quadrant
        } else {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <SouthWestIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
        }
        //if otherwise below
      } else {
        //if left quadrant
        if (
          Math.floor(i % buttonsPerRow) <
          Math.floor(targetIndex % buttonsPerRow)
        ) {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <NorthEastIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
          //otherwise right quadrant
        } else {
          maze.push(
            <Button
              onClick={() => handleIncorrectButton}
              color="error"
              variant="text"
              key={i}
            >
              <NorthWestIcon sx={{ color: "rgb(20, 20, 20)" }} />
            </Button>,
          );
        }
      }
    }
    return maze;
  };

  const createButtonMonster = () => {
    let font = Math.floor(Math.random() * 40) + 10;
    //this was a bit more complicated to randomize
    let topPos = [
      "20%",
      "80%",
      "40%",
      "60%",
      "90%",
      "10%",
      "50%",
      "80%",
      "40%",
      "50%",
    ];
    let rightPos = [
      "90%",
      "50%",
      "70%",
      "10%",
      "60%",
      "30%",
      "40%",
      "10%",
      "90%",
      "20%",
    ];
    let color;
    if ((createModalOpen && stage < 12) || stage == 3) {
      color = "error";
    } else {
      color = "rgb(20, 20, 20)";
    }
    return (
      <Button
        sx={{
          position: "absolute",
          top: topPos[buttonHealth],
          right: rightPos[buttonHealth],
          fontSize: font,
          color: { color },
        }}
        onClick={() => openModal(true)}
        variant="text"
        color="error"
      >
        <em className="olde">
          ~~
          <FontAwesomeIcon icon={faDragon} />
          ~~
        </em>
      </Button>
    );
  };

  const hurtMonster = () => {
    let health = buttonHealth - 1;
    setButtonHealth(health);
  };

  const playMusic = () => {
    new Audio(music).play();
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <h2 className="olde">{stageText[stage]} </h2>
        {stage == 0 ? (
          <Button
            onClick={() => openModal(true)}
            onFocus={() => playMusic()}
            color="error"
            variant="contained"
            sx={{
              fontSize: 30,
              position: "absolute",
              top: "50%",
              right: "37%",
            }}
          >
            <em className="olde">I'M NOT AFRAID.</em>
          </Button>
        ) : stage == 1 ? (
          createButtonMaze(0)
        ) : stage == 2 ? (
          createButtonMaze(3)
        ) : stage <= 12 ? (
          createButtonMonster()
        ) : (
          <Box sx={{ fontSize: 100, color: "SaddleBrown" }}>
            <FontAwesomeIcon icon={faCakeCandles} />
          </Box>
        )}
      </Box>
      <CreateNewAccountModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={() => setStage(stage + 1)}
        riddleIndex={riddleIndex}
        stage={stage}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={isToastrOpen}
        autoHideDuration={6000}
        onClose={closeToastr}
      >
        <Alert className="olde" onClose={() => closeToastr} severity="success">
          {toastrText}
        </Alert>
      </Snackbar>
    </>
  );
};

interface CreateModalProps {
  onClose: () => void;
  onSubmit: () => void;
  open: boolean;
  riddleIndex: number;
  stage: number;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  onClose,
  onSubmit,
  riddleIndex,
  stage,
}: CreateModalProps) => {
  const [ansErr, setAnsErr] = useState(false);
  const [userAns, setUserAns] = useState("");

  const handleSubmit = () => {
    let validAns = validateRiddle(riddles[riddleIndex], userAns);
    setAnsErr(!validAns);
    if (validAns || stage > 0) {
      setUserAns("");
      onSubmit();
      onClose();
    }
  };

  let normalDialog = (
    <Dialog open={open}>
      <DialogTitle
        sx={{ bgcolor: "rgb(35, 35, 35)", color: "whitesmoke" }}
        textAlign="center"
      >
        {stage == 0 ? (
          <div className="olde">ANSWER THE RIDDLE OR DIE</div>
        ) : stage == 1 ? (
          <div className="olde">YOU ESCAPE THE BLANK VOID</div>
        ) : stage == 2 ? (
          <div className="olde">YOU EXIT THE GARDEN</div>
        ) : (
          <div className="olde">THE KINGDOM IS SAVED</div>
        )}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "rgb(70, 70, 70)", color: "whitesmoke" }}>
        {stage == 0 ? (
          <>
            <p className="olde">{riddles[riddleIndex].question}</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                }}
              >
                {ansErr ? (
                  <TextField
                    sx={{ input: { color: "whitesmoke" } }}
                    className="olde"
                    error
                    helperText="Good God, at least try to answer! Think of what is at stake!"
                    onChange={(e) => setUserAns(e.target.value)}
                  />
                ) : (
                  <TextField
                    sx={{ input: { color: "whitesmoke" } }}
                    color="warning"
                    className="olde"
                    placeholder="One word answer..."
                    onChange={(e) => setUserAns(e.target.value)}
                  />
                )}
              </Stack>
            </form>
          </>
        ) : stage == 1 ? (
          <p>
            You grasp the gilded gate that opens to the Garden of the Grand
            Gale...
          </p>
        ) : stage == 2 ? (
          <p>
            You find the forgotten path to the forges of the founding fathers.
            Few can forgive their foolishness for allowing such a fiend to
            flourish here.
          </p>
        ) : (
          <p></p>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          p: "1.25rem",
          bgcolor: "rgb(70, 70, 70)",
          color: "whitesmoke",
          textAlign: "center",
        }}
      >
        <Button color="warning" onClick={handleSubmit} variant="contained">
          {stage == 0 ? (
            <div className="olde">Verily, this is my answer! </div>
          ) : stage == 1 ? (
            <div className="olde">I brave on.</div>
          ) : stage == 2 ? (
            <>
              <div className="olde">I will slay the beast.</div>
            </>
          ) : (
            <div></div>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );

  let monsterDialog = (
    <Dialog open={open}>
      <DialogContent
        sx={{
          bgcolor: "rgb(70, 70, 70)",
          color: "whitesmoke",
          textAlign: "center",
        }}
      >
        {stage == 12 ? (
          <div className="olde">
            As the dragon lies vulnerable on the ground, your blessed blade
            finally finds its breadth within the breast of the beast before you.
            The dragon drones out a dull dirge as its deadly last breath dances
            into dust at your boots.
          </div>
        ) : stage == 3 ? (
          <div className="olde">
            You swing your sword at the serpant and make contact, but the wound
            is yet superficial. She dips in and out of the thick cloud of ash;
            you know you must be alert to avoid losing sight of your target.
          </div>
        ) : stage == 4 ? (
          <div className="olde">
            You brush past a boulder with barely enough room, avoiding the
            burning breath and causing the beast to bash into your makeshift
            bulwark.
          </div>
        ) : stage == 5 ? (
          <div className="olde">
            It turns to incinerate you, but it sees only breifly the flint of
            your arrow before seeing nothing at all in its right eye.
          </div>
        ) : stage == 6 ? (
          <div className="olde">
            The monster attempts to flee, but you make its tail a sheath for
            your blade.
          </div>
        ) : stage == 7 ? (
          <div className="olde">
            You use its newly acquired blind spot to scale its adamantine side
            by locking your daggers between its scales.
          </div>
        ) : stage == 8 ? (
          <div className="olde">
            The dragon beats its burning wings, shattering stalactites as it
            hurls itself upwards and outwards. All you can do is hold on.
          </div>
        ) : stage == 9 ? (
          <div className="olde">
            The light of the sun is only barely comparable to the force of
            desctuction that spews from the gullet of this serpant. You continue
            climbing up the beast, for there is no way down now.
          </div>
        ) : stage == 10 ? (
          <div className="olde">
            The dragon attempts to toss you as you grasp the arrow still lodged
            in its skull, but you hold fast.
          </div>
        ) : (
          <div className="olde">
            You take the wound made by your arrow as a guide and plunge your
            blade to the hilt. You are tossed aside into the grass as the dragon
            rolls and impacts the ground.
          </div>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: "rgb(70, 70, 70)",
          color: "whitesmoke",
          textAlign: "center",
        }}
      >
        {" "}
        <Button color="warning" onClick={handleSubmit} variant="contained">
          {stage == 12 ? (
            <div className="olde">I return home victorious!</div>
          ) : (
            <div className="olde">I am not deterred.</div>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (stage <= 2) {
    return normalDialog;
  } else {
    return monsterDialog;
  }
};

let validateRiddle = (riddle: Riddle, userAns: string) =>
  riddle.answer == userAns.toLowerCase();

export default Example;
