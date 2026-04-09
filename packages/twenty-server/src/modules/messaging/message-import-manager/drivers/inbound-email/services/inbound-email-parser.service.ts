import { Injectable } from '@nestjs/common';

import PostalMime, { type Email as ParsedEmail } from 'postal-mime';
import { MessageDirection } from 'src/modules/messaging/common/enums/message-direction.enum';

import { X_TWENTY_ORIGIN_HEADER } from 'src/modules/messaging/message-import-manager/drivers/inbound-email/constants/x-twenty-origin-header.constant';
import { type ParsedInboundMessage } from 'src/modules/messaging/message-import-manager/drivers/inbound-email/types/parsed-inbound-message.type';
import { type MessageWithParticipants } from 'src/modules/messaging/message-import-manager/types/message';
import { extractParticipantsFromParsedEmail } from 'src/modules/messaging/message-import-manager/utils/extract-participants-from-parsed-email.util';
import { extractThreadIdFromParsedEmail } from 'src/modules/messaging/message-import-manager/utils/extract-thread-id-from-parsed-email.util';
import { sanitizeString } from 'src/modules/messaging/message-import-manager/utils/sanitize-string.util';

@Injectable()
export class InboundEmailParserService {
  async parse(
    rawMessage: Buffer,
    s3Key: string,
  ): Promise<ParsedInboundMessage> {
    const parsed = await PostalMime.parse(rawMessage);

    const originWorkspaceId = this.extractOriginWorkspaceId(parsed);
    const message = this.buildMessage(parsed, s3Key);

    return { parsed, originWorkspaceId, message };
  }

  private extractOriginWorkspaceId(parsed: ParsedEmail): string | null {
    const header = parsed.headers?.find(
      (h) => h.key?.toLowerCase() === X_TWENTY_ORIGIN_HEADER,
    );

    if (!header?.value) {
      return null;
    }

    return header.value.trim();
  }

  private buildMessage(
    parsed: ParsedEmail,
    s3Key: string,
  ): MessageWithParticipants {
    return {
      externalId: `inbound-email:${s3Key}`,
      messageThreadExternalId: extractThreadIdFromParsedEmail(parsed),
      headerMessageId: parsed.messageId?.trim() || `inbound-${s3Key}`,
      subject: sanitizeString(parsed.subject || ''),
      text: sanitizeString(parsed.text || ''),
      receivedAt: parsed.date ? new Date(parsed.date) : new Date(),
      direction: MessageDirection.INCOMING,
      attachments: [],
      participants: extractParticipantsFromParsedEmail(parsed),
    };
  }
}
