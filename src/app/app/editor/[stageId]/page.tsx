import MaxWidthWrapper from "@/app/_components/common/max-width-wrapper";
import ScaloorEditor from "./_components/scaloor-editor";

export default function StageEditor({ params }: { params: { stageId: string } }) {

    return (
        <MaxWidthWrapper className="flex flex-col">
            <ScaloorEditor />
        </MaxWidthWrapper>
    )
}