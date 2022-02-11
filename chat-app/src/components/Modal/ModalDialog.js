import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React from 'reactn';
import Dialog from '@material-ui/core/Dialog';
import GridItem from '../GridItem';

export default function ModalDialog({
  id, onClose, component, title,
}) {
  return (
    <Dialog
      key={id}
      open
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      disableEscapeKeyDown
      disableBackdropClick
      fullWidth
    >
      <DialogContent style={{ padding: 20 }}>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <IconButton
              style={{ float: 'right', bottom: '12px' }}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            {title}
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            {React.cloneElement(component, {
              modal: {
                id,
                close: onClose,
              },
            })}
          </GridItem>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
