import {Container} from "@mui/material"
import ClassificationBar from "@/components/utility/ClassificationBar"

export default function ClassificationContainer({
                                                    children,
                                                    classificationText,
                                                    textColor,
                                                    backgroundColor = 'grey',
                                                }) {

    /*
     * Classification & Control Markings - Astro UXDS
     * https://www.astrouxds.com/components/classification-markings/
     */

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