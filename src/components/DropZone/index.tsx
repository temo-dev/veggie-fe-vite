import { Center, Group, Stack, Text,Image } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';


interface DropZoneProps {
  dropzone?: Partial<DropzoneProps>
  handlerDrop: (file:File) => void
  defaultImage?: string | null
}

export function DropZoneImage(props: DropZoneProps) {
    const {dropzone, handlerDrop, defaultImage} = props
    const [preview, setPreview] = useState<string>(defaultImage || '')
    const handleDrop = (files: File[]) => {
      let value: any = files[0]
      if(value){
        const reader = new FileReader();
      // Khi đọc file xong, thiết lập URL hình ảnh để hiển thị
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setPreview(reader.result); // URL dữ liệu của file
          }
        };
        // Đọc file dưới dạng Data URL
        reader.readAsDataURL(value);
        }
        handlerDrop(value)
    }
  return (
    <Dropzone
      onDrop={(files) => handleDrop(files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
      {...dropzone}
      className='border-2 border-dashed border-gray-300 rounded-lg p-1 my-2'
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
        </Dropzone.Reject>
          {
            preview ?
            <Image src={preview}/>
            :
            <>
              <Dropzone.Idle>
              <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5}/>
              </Dropzone.Idle>
              <Center>
                <Stack>
                <Text size="xl" inline>
                    Thêm Hình Ảnh Vào Đây
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                    Đảm Bảo Kích Thước Dưới 5MB, và ảnh có đuôi jpg
                </Text>
                </Stack>
              </Center>
          </>
          }
      </Group>
    </Dropzone>
  );
}