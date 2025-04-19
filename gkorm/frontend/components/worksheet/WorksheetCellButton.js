import {useTheme} from '@mui/material';
import WorksheetCellBase from "@/components/worksheet/WorksheetCellBase";

export default function WorksheetCellButton({
                                                theme = useTheme(),
                                                color = (theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200])),
                                                backgroundColor = (theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]),
                                                borderRight = false,
                                                borderColor = (theme.palette.mode === 'dark' ? '#111' : '#333'),
                                                justifyContent = '',
                                                selected = false,
                                                children,
                                            }) {

    return (
        <WorksheetCellBase
            borderRight={borderRight}
            justifyContent={justifyContent}
            borderColor={borderColor}
            backgroundColor={selected ? '#003168' : backgroundColor}
            color={selected ? '#b3cbec' : color}
        >
            {/*TODO - add these colors to the theme for both modes */}
            {children}
        </WorksheetCellBase>
    );
}
