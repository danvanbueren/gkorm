/******************************************************************************
 * COPYRIGHT © 2025 DANIEL VAN BUEREN. ALL RIGHTS RESERVED.                   *
 *                                                                            *
 * THIS MATERIAL IS PROTECTED BY COPYRIGHT LAW. NO PART OF THIS WORK MAY BE   *
 * COPIED, REPRODUCED, DISTRIBUTED, TRANSMITTED, DISPLAYED, OR PERFORMED IN   *
 * ANY FORM OR BY ANY MEANS, ELECTRONIC, MECHANICAL, PHOTOCOPYING, RECORDING, *
 * OR OTHERWISE, WITHOUT PRIOR WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.   *
 ******************************************************************************/

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