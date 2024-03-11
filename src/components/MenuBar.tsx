import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/lib/ui/menubar";

export default function MenuBar() {
  return (
    <Menubar className="justify-end">
      <MenubarMenu>
        <MenubarTrigger className="justify-end items-end">File</MenubarTrigger>
        <MenubarContent className="justify-start">
          <MenubarItem className="justify-end">New Window</MenubarItem>
          <MenubarItem className="justify-end">Share</MenubarItem>
          <MenubarItem className="justify-end">Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
