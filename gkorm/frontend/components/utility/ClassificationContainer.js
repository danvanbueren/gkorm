import {Container} from "@mui/material";
import ClassificationBar from "@/components/utility/ClassificationBar";

export default function ClassificationContainer({
                                                    children,
                                                    classificationText,
                                                    textColor,
                                                    backgroundColor = 'grey',
                                                }) {

    return (
        <>
            <ClassificationBar
                classificationText={classificationText}
                textColor={textColor}
                backgroundColor={backgroundColor}
            />
            <Container maxWidth="xl" sx={{minWidth: '30rem', height: '95dvh', overflow: 'auto'}}>
                {children}
            </Container>
            <ClassificationBar
                classificationText={classificationText}
                textColor={textColor}
                backgroundColor={backgroundColor}
            />
        </>
    )
}