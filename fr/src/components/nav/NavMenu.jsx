import { Button, MenuRoot, MenuTrigger, MenuContent, MenuItem, Box, Icon } from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi";



function NavMenu() {
    return <Box position="relative">
        <MenuRoot>
            <MenuTrigger asChild>
                <Button backgroundColor={"transparent"} color={"white"} variant="ghost" _hover={{ borderColor: "whiteAlpha.400" }} _ width={"1rem"} rounded={"1rem"}>
                    <Icon fontSize={"1.5rem"} ><FiMenu /></Icon>
                </Button>
            </MenuTrigger>
            <MenuContent position="absolute" top="2.5rem">
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="sell">Sell</MenuItem>
                <MenuItem value="search" display={{base:"none", mdDown: "block"}}>Search</MenuItem>
                <MenuItem value="login" display={{base:"none", smDown: "block"}}>Login</MenuItem>
                <MenuItem value="sign-up" display={{base:"none", smDown: "block"}}>Sign Up</MenuItem>
            </MenuContent>
        </MenuRoot>
    </Box>
}

export default NavMenu


