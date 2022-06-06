// prettier-ignore
import { Button, Card, Text, Image, Grid, useToasts, Spacer, useTheme, useModal, Link, Modal, Snippet, Tag } from '@geist-ui/core';
import dynamicWidth from '@/lib/dynamic-width';
import { useState } from 'react';
import NextLink from 'next/link';
const index = () => {
  const theme = useTheme();
  const { setToast } = useToasts();
  const { setVisible, bindings } = useModal();

  const download = (type: 'x64' | 'arm') => {
    switch (type) {
      case 'x64':
        setShasum('testing-x64-shasum');
        break;
      case 'arm':
        setShasum('testing-arm-shasum');
        break;
    }
    setVisible(true);
    setToast({ text: 'This download is not available yet.', delay: 5000, type: 'error' });
  };

  const [gridDirection, setGridDirection] = useState<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row');
  const [gridWidth, setGridWidth] = useState(6);
  const [shasum, setShasum] = useState('');

  dynamicWidth((width) => {
    if (width < 1050) {
      setGridDirection('column');
      setGridWidth(14);
    } else {
      setGridDirection('row');
      setGridWidth(6);
    }
  });

  return (
    <>
      <div className="text-center" id="overview">
        <Spacer h={3} />
        <Text className="header" h1>
          Give your PC an Upgrade.
        </Text>
        <Spacer h={1} />
        <Grid.Container gap={3} direction={gridDirection} alignItems="center" justify="center">
          <Grid xs={gridWidth}>
            <Card
              shadow
              style={{ background: theme.palette.background }}
              hoverable
              paddingTop="40px"
              paddingBottom="10px"
              width="100%"
            >
              <Tag type="success">For most people</Tag>
              <Image draggable="false" src="/assets/icons/x64.png" height="100%" width="170px" />
              <Spacer h={2} />
              <Button
                type="success"
                shadow
                onClick={() => {
                  download('x64');
                }}
                margin="10px"
              >
                Direct Download
              </Button>
              <Button
                onClick={() => {
                  download('x64');
                }}
                margin="10px"
              >
                Torrent Download
              </Button>
            </Card>
          </Grid>
          <Grid xs={gridWidth}>
            <Card
              style={{ background: theme.palette.background }}
              hoverable
              paddingTop="50px"
              paddingBottom="25px"
              width="100%"
            >
              <Image draggable="false" src="/assets/icons/ARM.png" height="100%" width="170px" />
              <Spacer h={2} />
              <Button
                type="success"
                shadow
                onClick={() => {
                  download('arm');
                }}
                margin="10px"
              >
                Direct Download
              </Button>
              <Button
                onClick={() => {
                  download('arm');
                }}
                margin="10px"
              >
                Torrent Download
              </Button>
            </Card>
          </Grid>
        </Grid.Container>
        <div className="mx-auto" style={{ width: '40%', margin: '40px' }}>
          <Card hoverable className="text-center trouble" style={{ background: theme.palette.accents_1 }}>
            Having trouble? Click{' '}
            <NextLink href="/support">
              <>
                <Link block>here</Link> to get help!
              </>
            </NextLink>
          </Card>
        </div>
      </div>
      <Modal {...bindings}>
        <Modal.Title>Integrity check</Modal.Title>
        <Modal.Subtitle>Check your download's shasum</Modal.Subtitle>
        <Modal.Content>
          <p>This is optional. You can check your download's integrity by comparing with our shasum:</p>
          <Snippet symbol="" text={shasum}></Snippet>
        </Modal.Content>
        <Modal.Action onClick={() => setVisible(false)}>Close</Modal.Action>
      </Modal>
      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          max-width: 500%;
          padding: 0;
          border-top: none !important;
        }
        .trouble {
          background: ${theme.palette.background} !important;
        }
        .trouble:hover {
          background: ${theme.palette.accents_2} !important;
        }
        .header {
          font-size: 72px;
          background: -webkit-linear-gradient(#eee, #333);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </>
  );
};
export default index;
